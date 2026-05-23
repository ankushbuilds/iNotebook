import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleDelete = () => {
    deleteNote(note._id);
  };


  return (
    <div className='col-md-3'>
      <div className="card my-3" style={{ width: '15rem' }}>
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
