import * as React from "react";
import { Toast, ToastState, ToastAction, ToastActionType } from "../types";
import { TOAST_LIMIT, TOAST_REMOVE_DELAY } from "../constants";

let count = 0;

/**
 * Generate unique ID for toasts
 * @returns Unique toast ID
 */
function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Add toast to removal queue with timeout
 * @param toastId - ID of toast to remove
 */
const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ToastActionType.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Toast state reducer
 * @param state - Current toast state
 * @param action - Action to perform
 * @returns New toast state
 */
export const reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case ToastActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast!, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ToastActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast!.id ? { ...t, ...action.toast } : t
        ),
      };

    case ToastActionType.DISMISS_TOAST: {
      const { toastId } = action;

      // Add side effect for dismissal
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }

    case ToastActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
};

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

/**
 * Dispatch action to update toast state
 * @param action - Action to dispatch
 */
function dispatch(action: ToastAction): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * Create and display a toast
 * @param props - Toast properties
 * @returns Toast control object
 */
function toast(props: Omit<Toast, "id" | "open" | "onOpenChange">) {
  const id = genId();

  const update = (props: Partial<Toast>) =>
    dispatch({
      type: ToastActionType.UPDATE_TOAST,
      toast: { ...props, id },
    });

  const dismiss = () => 
    dispatch({ 
      type: ToastActionType.DISMISS_TOAST, 
      toastId: id 
    });

  dispatch({
    type: ToastActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

/**
 * Hook for managing toast state and operations
 * @returns Toast state and operations
 */
function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => 
      dispatch({ 
        type: ToastActionType.DISMISS_TOAST, 
        toastId
      }),
  };
}

export { useToast, toast };