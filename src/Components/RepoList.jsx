

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
            <div className="repositories-list">
                {paginatedRepositories.map(repository => (
                    <div className="repository" key={repository.id}>
                        <img
                            className="repository-avatar"
                            src={repository.owner.avatar_url}
                            alt={`${repository.owner.login}'s avatar`}
                        />
                        <div className="repository-details">
                            <h2 className="repository-name">
                                <a href={repository.html_url}>{repository.name}</a>
                            </h2>
                            <div className="repository-info">
                                <span className="repository-author">{repository.owner.login}</span>
                                <span className="repository-date">{repository.updated_at}</span>
                            </div>
                            <p className="repository-description">{repository.description}</p>
                            <div className="repository-counts">
                                <span className="repository-stars">{repository.stargazers_count} stars</span>
                                <span className="repository-forks">{repository.forks_count} forks</span>
                                <span className="repository-issues">{repository.open_issues_count} issues</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderGrid = () => {
        return (
            <div className="repositories-grid">
                {paginatedRepositories.map(repository => (
                    <div className="repository" key={repository.id}>
                        <img
                            className="repository-avatar"
                            src={repository.owner.avatar_url}
                            alt={`${repository.owner.login}'s avatar`}
                        />
                        <div className="repository-details">
                            <h2 className="repository-name">
                                <a href={repository.html_url}>{repository.name}</a>
                            </h2>
                            <div className="repository-info">
                                <span className="repository-author">{repository.owner.login}</span>
                                <span className="repository-date">{repository.updated_at}</span>
                            </div>
                            <p className="repository-description">{repository.description}</p>
                            <div className="repository-counts">
                                <span className="repository-stars">{repository.stargazers_count} stars</span>
                                <span className="repository-forks">{repository.forks_count} forks</span>
                                <span className="repository-issues">{repository.open_issues_count} issues</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <>
            <div className={`app${theme}`}>
                {/* <header className="app-header">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search repositories"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <FaSearch className="search-icon" />
                    </div>
                    <div className="theme-toggle" onClick={handleThemeChange}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </div>
                    <div className="view-toggle" onClick={handleViewTypeChange}>
                        {viewType === 'list' ? <MdViewModule /> : <MdViewList />}
                    </div>
                </header> */}
                <div className="repositories-container">
                    {viewType === 'list' ? renderList() : renderGrid()}
                </div>
                <div className="pagination-container">
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                    />
                </div>
                <footer className="app-footer">
                    <p>
                        Modeled by <a href="https://github.com/debasistripathy01">Debasis Tripathy (Thor)</a>
                    </p>
                </footer>
            </div>

        </>
    )
}