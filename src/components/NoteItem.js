import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


const NoteItem = (props) => {

  const { note, updateNote, showAlert } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleDelete = async() => {
    await deleteNote(note._id);
      props.showAlert("Deleted Successfully", "success");
  };


  return (
    <div className='col-md-3'>
      <div className="card note-card" style={{ width: '15rem' }}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">

            <h5 className="card-title mb-0">{note.title}</h5>

            <div className='icons'>
              <i className="fa-regular fa-bookmark mx-1"></i>

              <span
                role="button"
                className="mx-1"
                onClick={() => updateNote(note)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </span>

              <span
                role="button"
                className="mx-1"
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash-can"></i>
              </span>


            </div>

          </div>
          <p className="card-text">{note.description}</p>


        </div>
      </div>
    </div>
  )
}

export default NoteItem
