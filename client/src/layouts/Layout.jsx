import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Body from './body/Body';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.css';

export default function Layout() {
    return (
        <div className={styles.layout}>
            <ScrollRestoration />
            <Header />
            <Body />
            <Footer />
        </div>
    );
}
