import {
  PropFunction,
  Slot,
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import ModalStyles from "./modal.css?inline";

enum Size {
  sm = "modal-sm",
  md = "modal-md",
  lg = "modal-lg",
}

type SizeOption = keyof typeof Size;

interface Props {
  show: boolean;
  size?: SizeOption;
  persistent?: boolean;
  onClose: PropFunction<() => void>;
}

export const Modal = component$(
  ({ onClose, show, persistent = false, size }: Props) => {
    useStylesScoped$(ModalStyles);

    return (
      // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
      <div
        id="modal-background"
        onClick$={(event) => {
          if (persistent) return;
          const modalId = (event.target as HTMLDivElement).id;
          if (modalId === "modal-background") onClose();
        }}
        class={show ? "modal-background" : "hidden"}
      >
        <div class={`modal-content ${size ? Size[size] : ""}`}>
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button id="ok-btn" class="modal-button" onClick$={onClose}>
                Cerrar
              </button>
            </div>
            <Slot />
          </div>
        </div>
      </div>
    );
  }
);
