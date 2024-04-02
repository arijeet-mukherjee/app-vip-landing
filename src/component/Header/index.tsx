import React from 'react';
import Link from 'next/link';
import styles from "./styles.module.css";

const Header: React.FC = () => {
    return (
        <nav className={styles.header + " " +"bg-gray-800"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={styles.menu + " " +"flex items-center justify-between h-16"}>
                    <div className={"flex items-center"}>
                        <div className={"flex-shrink-0"}>
                            <Link href="/" legacyBehavior>
                                <a className={styles["menu-item"] + " " +"text-white font-bold text-xl"}>Logo</a>
                            </Link>
                        </div>
                        <div className="menu-item hidden md:block">
                            <div className={"ml-10 flex items-baseline space-x-4"}>
                                <Link href="/about" legacyBehavior>
                                    <a className={styles["menu-item"] + " " + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>About</a>
                                </Link>
                                <Link href="/services" legacyBehavior>
                                    <a className={styles["menu-item"] + " " + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Services</a>
                                </Link>
                                <Link href="/contact" legacyBehavior>
                                    <a className={styles["menu-item"] + " " +"text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Contact</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;