import EspecModal from './especModal.tsx';

type PtsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


export default function ModalPtaTemplate({ isOpen, onClose }: PtsModalProps) {
    if (!isOpen) return null;
  return (

    <EspecModal isOpen={isOpen} onClose={onClose} />

  );
}