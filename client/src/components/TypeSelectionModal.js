import React from 'react';
import ReactModal from 'react-modal';
import {categories} from "@/constants";

export const TypeSelectionModal = ({ isOpen, onClose, setCategory ,toggleSortByDate ,sortByDate}) => {


    const handleCategorySelect = (type) => {
        onClose();
        setCategory(type);
    };


    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust the overlay background color if needed
        },
        content: {
            width: '400px', // Adjust the width of the modal content
            height: '300px', // Adjust the height of the modal content
            margin: 'auto', // Center the modal horizontally
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none', // Remove the border if needed
            borderRadius: '8px', // Adjust the border radius if needed
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Add shadow if desired
            background: '#ffffff', // Adjust the background color if needed
        },
    };
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Type Selection Modal"  style={modalStyles} >
            <div className="text-black">
                <h2 className="m-4">Select Type</h2>
                {categories.map((category) => (
                    <button className="m-4 border-2 border-black p-3 w-20" key={category} onClick={() => handleCategorySelect(category)}>
                        {category}
                    </button>
                ))}
                <br/>
                <label>
                    <input type="checkbox" onClick={toggleSortByDate} checked={sortByDate}/>
                        <span> sort by date</span>
                </label>

            </div>
        </ReactModal>
    );
};
