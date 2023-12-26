const DeleteModal = ({ message, deleteFn, closeModal, account }) => {
  const handleDelete = async () => {
    const res = await deleteFn(account);
    if (res.status) {
      closeModal();
    }
  };
  return (
    <div className=" bg-secondary-100 p-6 rounded-xl shadow-2xl min-w-min">
      <span className=" uppercase font-bold">{message}</span>
      <hr className="my-4 border-gray-500/30" />
      <div className="flex justify-center gap-4">
        <button
          className="bg-primary text-black uppercase font-bold text-sm w-[3rem] py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors"
          onClick={() => {
            deleteFn(account), closeModal();
          }}>
          SI
        </button>
        <button
          className="bg-primary text-black uppercase font-bold text-sm w-[3rem] py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors"
          onClick={closeModal}>
          NO
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
