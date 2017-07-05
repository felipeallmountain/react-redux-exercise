import React from 'react';

class FilterLink extends React.Component {
  render() {
    const { filter, currentFilter, children, onClick } = this.props;
    
    return(
      <button
        onClick={e => {
          e.preventDefault();
          onClick(filter);
        }}
        disabled={filter === currentFilter}
      >
        {children}   
      </button>
    )
  }
}

export default FilterLink;