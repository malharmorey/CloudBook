import React, { useContext } from 'react';
import moment from 'moment';
import noteContext from '../context/notes/NoteContext';

function NoteCard(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	return (
		<div className='my-4'>
			<div className='card m-auto'>
				<div className='card-body cardBody bg-dark'>
					<h5 className='card-title cardText' id='cardTitle'>
						{props.title}
					</h5>
					<br />
					<p className='card-text cardText'>{props.description}...</p>
					<p className='card-text cardText'>{props.tag}</p>
					<p className='card-text mb-3'>
						<small className='text-muted '>
							Modified {moment(props.date).startOf('minutes').fromNow()}
						</small>
					</p>
					<button
						type='button'
						className='btn btn-primary '
						data-bs-toggle='modal'
						data-bs-target='#updateModal'
						id={props.id}
					>
						Edit
					</button>
					<button
						type='button'
						className='btn btn-danger mx-2'
						onClick={() => {
							deleteNote(props.id);
						}}
					>
						Delete
					</button>

					{/* ///////--------------MODAL------------////// */}
					<div
						className='modal fade'
						id='updateModal'
						tabIndex='-1'
						aria-labelledby='exampleModalLabel'
						aria-hidden='true'
					>
						<div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
							<div className='modal-content modalCard'>
								<div className='modal-header'>
									<h5 className='modal-title' id='exampleModalLabel'>
										Edit Note
									</h5>
									<button
										type='button'
										className='btn-close'
										data-bs-dismiss='modal'
										aria-label='Close'
									></button>
								</div>
								<div className='modal-body'>
									<form>
										<div className='mb-3'>
											<label
												htmlFor='recipient-name'
												className='col-form-label'
											>
												Title:
											</label>
											<input
												type='text'
												className='form-control'
												id='recipient-name'
											/>
										</div>
										<div className='mb-3'>
											<label htmlFor='message-text' className='col-form-label'>
												Note:
											</label>
											<textarea
												className='form-control'
												id='message-text'
												rows='6'
											></textarea>
										</div>
										<div className='mb-3'>
											<label
												htmlFor='recipient-name'
												className='col-form-label'
											>
												Tags:
											</label>
											<input
												type='text'
												className='form-control'
												id='recipient-name'
											/>
										</div>
									</form>
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-secondary'
										data-bs-dismiss='modal'
									>
										Close
									</button>
									<button
										type='button'
										className='btn btn-success'
										data-bs-dismiss='modal'
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NoteCard;
