

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { MdViewList, MdViewModule } from 'react-icons/md';

import '../App.css';
import {Pagination} from './Pagination';

const API_URL = 'https://api.github.com/search/repositories?q=stars:%3E0&sort=stars&per_page=100';

export function RepoList() {
    const [repositories, setRepositories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [theme, setTheme] = useState('light');
    const [viewType, setViewType] = useState('list');

    useEffect(() => {
        axios
            .get(API_URL)
            .then(response => {
                setRepositories(response.data.items);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleLanguageChange = event => {
        setSelectedLanguage(event.target.value);
        setCurrentPage(1);
    };

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleViewTypeChange = () => {
        setViewType(viewType === 'list' ? 'grid' : 'list');
    };

    const filteredRepositories = repositories.filter(repository => {
        return (
            repository.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedLanguage === '' || repository.language === selectedLanguage)
        );
    });

    const pageCount = Math.ceil(filteredRepositories.length / 10);

    const handlePageChange = pageNumber => setCurrentPage(pageNumber);

    const paginatedRepositories = filteredRepositories.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    );

    const renderList = () => {
        return (
            
    )
}