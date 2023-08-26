import React from 'react'

/**
 * Row that will be displayed on each section.
 * @param {string} rowTitle - Title to be given on each row.
 * @param {JSX.Element} rowIcon - Icon to be placed on each row of a section.
 * @param {string} rowParent - Parent section of a row.
 * @param {fuction} setQuery - Sets the value of the code editor.
 * @returns {JSX.Element} Row that should be shown in each section.
 */

const Row = ({ rowTitle, rowIcon, rowParent, setQuery }) => {

    const handleRow = (rowTitle) => {
        if (rowParent === 'table') {
            setQuery(`SELECT * FROM '${rowTitle}';`);
        }
        else {
            setQuery(rowTitle);
        }
    }

    return (
        <div className="sidebar__section--element"
            onClick={() => { handleRow(rowTitle); }}>
            <p className="sidebar__section--para">
                {rowIcon}
                <span>{rowTitle}</span>
            </p>
        </div>
    );
}

export { Row };