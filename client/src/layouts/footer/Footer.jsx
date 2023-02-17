import React from 'react';
import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';
import visaSVG from '../../assets/images/visa.svg';
import masterCardSVG from '../../assets/images/master-card.svg';
import paypalSVG from '../../assets/images/paypal.svg';
import {
    FacebookOutlined,
    Instagram,
    Pinterest,
    Twitter,
    LinkedIn,
} from '@mui/icons-material';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.topSection}>
                    <div className={styles.footerLeft}>
                        <div className={styles.leftMenu}>
                            <h5 className={styles.menuTitle}>About ShinPay</h5>
                            <ul className={styles.menuContainer}>
                                <li className={styles.menuItem}>
                                    <NavLink>About</NavLink>
                                </li>
                                <li className={styles.menuItem}>
                                    <NavLink>Blogger</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.leftMenu}>
                            <h5 className={styles.menuTitle}>Help & support</h5>
                            <ul className={styles.menuContainer}>
                                <li className={styles.menuItem}>
                                    <NavLink>Shipping info</NavLink>
                                </li>
                                <li className={styles.menuItem}>
                                    <NavLink>Returns</NavLink>
                                </li>
                                <li className={styles.menuItem}>
                                    <NavLink>How to order</NavLink>
                                </li>
                                <li className={styles.menuItem}>
                                    <NavLink>How to track</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.leftMenu}>
                            <h5 className={styles.menuTitle}>
                                Customer service
                            </h5>
                            <ul className={styles.menuContainer}>
                                <li className={styles.menuItem}>
                                    <NavLink>Contact us</NavLink>
                                </li>
                                <li className={styles.menuItem}>
                                    <NavLink>Payment & Tax</NavLink>
                                </li>
                                <li className={styles.menuItem}>
                                    <NavLink>Voucher</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerRight}>
                        <div className={styles.rightMenu}>
                            <h5 className={styles.menuTitle}>Find us on</h5>
                            <div className={styles.socialList}>
                                <NavLink className={styles.socialIcon}>
                                    <FacebookOutlined
                                        sx={{ fontSize: '1.8rem' }}
                                    />
                                </NavLink>
                                <NavLink className={styles.socialIcon}>
                                    <Twitter sx={{ fontSize: '1.8rem' }} />
                                </NavLink>
                                <NavLink className={styles.socialIcon}>
                                    <Instagram sx={{ fontSize: '1.8rem' }} />
                                </NavLink>
                                <NavLink className={styles.socialIcon}>
                                    <LinkedIn sx={{ fontSize: '1.8rem' }} />
                                </NavLink>
                                <NavLink className={styles.socialIcon}>
                                    <Pinterest sx={{ fontSize: '1.8rem' }} />
                                </NavLink>
                            </div>
                        </div>
                        <div className={styles.rightMenu}>
                            <h5 className={styles.menuTitle}>
                                Subscribe for ShinPay latest news
                            </h5>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="Your email address"
                                    className={styles.input}
                                />
                                <div className={styles.btnSubscribe}>
                                    Subscribe
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightMenu}>
                            <h5 className={styles.menuTitle}>We accept</h5>
                            <div className={styles.paymentList}>
                                <div className={styles.paymentMethod}>
                                    <img
                                        src={visaSVG}
                                        alt="Visa"
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.paymentMethod}>
                                    <img
                                        src={masterCardSVG}
                                        alt="MasterCard"
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.paymentMethod}>
                                    <img
                                        src={paypalSVG}
                                        alt="PayPal"
                                        className={styles.image}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.copyright}>
                        &#169; 2023 ShinPay. All Rights Reserved
                    </div>
                    <div className={styles.privacyList}>
                        <NavLink className={styles.privacyItem}>
                            Privacy Center
                        </NavLink>
                        <NavLink className={styles.privacyItem}>
                            Privacy & Cookie Policy
                        </NavLink>
                        <NavLink className={styles.privacyItem}>
                            Terms & Conditions
                        </NavLink>
                        <NavLink className={styles.privacyItem}>
                            Copyright Notice
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
