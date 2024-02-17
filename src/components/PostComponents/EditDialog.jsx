import React, { useEffect, useRef } from "react";

import Button from '../Common/Button';
import Heading from '../Common/Heading';

const EditDialog = ({ openModal, closeModal, children, title, className = "" }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className={"dialog " + className}>
      {title && <Heading tag={"h2"} text={title} />}
      {children}
      <Button onClick={closeModal} className={"btn-close"} />
    </dialog>
  );
};

export default EditDialog;
