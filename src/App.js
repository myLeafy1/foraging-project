import { useState } from "react";
import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './App.css';
import { PLANTS } from "./plants";

function App() {
  const [currentPlants, setCurrentPlants] = useState(PLANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['Wild Greens and Roots', 'Roots', 'Mushrooms', 'Berries', 'Tree Fruits']);

  function filterPlants() {
    let filteredPlants = PLANTS;

    // if (searchQuery) {
    //   filteredPlants = filteredPlants.filter(plant =>
    //     plant.plantName.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    if (selectedFilters.length > 0) {
      filteredPlants = filteredPlants.filter(plant =>
        selectedFilters.includes(plant.groupName)
      );
    }
    console.log(filteredPlants);
    setCurrentPlants(filteredPlants);
  }

  function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);
    filterPlants();
  }

  function handleFilterChange(filter) {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
    filterPlants();
  }

  return (
    <div>
      <div className="header">
        <h1>Plants</h1>
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        <div className="checkboxContainer">
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Wild Greens and Roots')}
              onChange={() => handleFilterChange('Wild Greens and Roots')}
            />
            Wild Greens and Roots
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Roots')}
              onChange={() => handleFilterChange('Roots')}
            />
            Roots
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Mushrooms')}
              onChange={() => handleFilterChange('Mushrooms')}
            />
            Mushrooms
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Berries')}
              onChange={() => handleFilterChange('Berries')}
            />
            Berries
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilters.includes('Tree Fruits')}
              onChange={() => handleFilterChange('Tree Fruits')}
            />
            Tree Fruits
          </label>
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <div>
        {currentPlants.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.plantName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>Group: {item.groupName}</div>
                <div>Season of availability: {item.seasonOfAvailibility}</div>
                <div>{item.poisonous ? 'Poisonous' : 'Not poisonous'}</div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default App;