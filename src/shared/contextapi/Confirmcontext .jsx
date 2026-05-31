import { createContext, useContext, useRef, useState } from "react";

const ConfirmContext = createContext(null);//state global berupa promise yg dipakai dimana saja tergantung dibungkus dimana

export function ConfirmProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const decision = useRef(null);

  const confirm = (msg) => {
    setMessage(msg);
    setVisible(true);
    return new Promise((resolve) => {
      decision.current = resolve;
    });
  };

  const handleYes = () => {
    setVisible(false);
    decision.current(true);
  };

  const handleNo = () => {
    setVisible(false);
    decision.current(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {visible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-72 shadow-xl flex flex-col gap-4">
            <p className="text-sm text-gray-700">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleNo}
                className="px-4 py-2 rounded border border-gray-300 text-sm"
              >
                Tidak
              </button>
              <button
                onClick={handleYes}
                className="px-4 py-2 rounded bg-red-600 text-white text-sm"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}