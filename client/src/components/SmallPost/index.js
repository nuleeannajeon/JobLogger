import React from 'react';
import ExistingPostModal from '../Modal/ExistingPostModal'


const SmallPost = (props) => {
    const {_id, color, salary, company, location, title, reminder} = props
    return (
        <div className="media" key={_id} id={color}>
            <div className="media-body">
                <button className="box-delete-button" onClick={() => props.handleDelete(_id)}>
                    {props.deleteText ? props.deleteText : <i className="fas fa-trash-alt"></i>}
                </button>
                <ExistingPostModal data={props} rerender={props.rerender} />
                <span>{company ? company : 'No defined company'}</span>
                <div style={{ paddingTop: '15px' }}>
                    <h6 style={{ display: 'inline-block' }}>{title ? title : 'No defined Position'}</h6>
                    <p>
                        {location ? location : 'No Location available'}, $
                        {salary ? salary : '....'}/monthly
                    </p>
                    <p>
                        Reminder : {new Date(reminder).toDateString()   }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SmallPost;
