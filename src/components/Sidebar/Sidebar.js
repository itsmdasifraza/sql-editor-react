import React, { useMemo } from 'react'
import './Sidebar.css';
import { tables } from '../../data/tables';
import { query } from '../../data/query';
import TocIcon from '@mui/icons-material/Toc';
import TerminalIcon from '@mui/icons-material/Terminal';
import HistoryIcon from '@mui/icons-material/History';
import { Row } from './Row/Row';

/**
 * The sidebar layout displays the list of sections like database table, reference query, recent query.
 * @param {array} recentQuery - List of searched query.
 * @param {function} setQuery - Function to update value of query.
 * @returns {JSX.Element} Sidebar JSX element.
 */
const Sidebar = ({ recentQuery , setQuery }) => {

  /*
   * Store memoize value of 'database table' section to prevent re-renders.
   */
  const databseTableRows = useMemo(() => {
    return tables.map((element, index) => (
      <Row key={index} rowTitle={element} rowIcon={<TocIcon className="section-icon"/>} rowParent="table" setQuery = { setQuery } />
    ));
  }, [setQuery]);

  /*
   * Store memoize value of 'reference query' section to prevent re-renders.
   */
  const referenceQueryRows = useMemo(() => {
    return query.map((element, index) => (
      <Row key={index} rowTitle={element} rowIcon={<TerminalIcon className="section-icon"/>} rowParent="reference_query" setQuery = { setQuery } />
    ));
  }, [setQuery]);

  /*
   * Store memoize value of 'recent query' section to prevent re-renders.
   */
  const recentQueryRows = useMemo(() => {
    return recentQuery.map((element, index) => (
      <Row key={index} rowTitle={element} rowIcon={<HistoryIcon className="section-icon"/>} rowParent="recent_query" setQuery = {setQuery} />
    ));
  }, [recentQuery, setQuery]);

  return (
    <section className="sidebar">
      {/*
        * Database table section.
        */}
      <div className="sidebar__section">
        <h4 className="sidebar__section--head">Database Table</h4>
        <div className="sidebar__section--body">{databseTableRows}</div>
      </div>
      {/*
        * Reference query section.
        */}
      <div className="sidebar__section">
        <h4 className="sidebar__section--head">Reference Query</h4>
        <div className="sidebar__section--body">{referenceQueryRows}</div>
      </div>
      {/*
        * Recent query section. 
        */}
      <div className="sidebar__section">
        <h4 className="sidebar__section--head">Recent Query</h4>
        <div className="sidebar__section--body">{recentQueryRows}</div>
      </div>
    </section>
  )
}

export { Sidebar };