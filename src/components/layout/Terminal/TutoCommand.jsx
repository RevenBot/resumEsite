const TutoCommand = () => {
  return (
    <>
      <div className="flex w-full justify-content-between">
        <div>hover a book</div>
        <div>Display the book title when the cursor is over a book.</div>
      </div>
      <div className="flex w-full justify-content-between">
        <div>click a book</div>
        <div>Open the details section of the selected book.</div>
      </div>
      <div className="flex w-full justify-content-between">
        <div>click back</div>
        <div>Return to the main library view from the details section.</div>
      </div>
      <div className="flex w-full justify-content-between">
        <div>click 3D</div>
        <div>Open the 3D interactive page for the selected book.</div>
      </div>
      <br />
    </>
  );
};

export default TutoCommand;
