import React from 'react'

/**
 * Row that will be displayed on each section.
 * @param {String} rowTitle - Title to be given on each row.
 * @param {String} rowIcon - Icon to be placed on each row of a section.
 * @param {String} rowParent - Parent section of a row.
 * @returns {JSX.Element} JSX row that should be shown on each section.
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