import styles from '@/styles/molecules/Header.module.css';
import Image from 'next/image'
import SeedlingLogo from '@/assets/SeedlingLogo.png'
import ProfileIcon from '@/assets/ProfileIcon.png'
import Link from 'next/link';
import ThemeSwitcher from '../atoms/ThemeSwitcher';

/*
    This molecule component is used to render header
    which is common to all pages
*/
export default function Header() {
    return (
        <div className={styles.h786header}>
            <div className={styles.cn786companyName}>
                <Link href="/" className={styles.h786companyNameLink}>
                    Groww Social
                    <Image 
                        src={SeedlingLogo} 
                        alt="Logo of Social Seedling"
                        className={styles.cl786companyLogo} 
                        width={40}
                        height={40}
                        loading='eager'
                    />
                </Link>
            </div>
            <div className={styles.h786handles}>
                <ThemeSwitcher className={styles.h786themeSwitcher}/>
                <Link href="/user/noob_dhairya" className={styles.h786profileLink}>
                    <Image 
                        src={ProfileIcon} 
                        alt="Profile Icon of Social Seedling"
                        className={styles.p786profileIcon} 
                        width={30}
                        height={30}
                        loading='eager'
                    />
                </Link>
            </div>
        </div>
    );
}