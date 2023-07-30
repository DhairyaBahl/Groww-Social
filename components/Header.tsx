import styles from '@/styles/Header.module.css';
import Image from 'next/image'
import SeedlingLogo from '@/assets/SeedlingLogo.png'
import ProfileIcon from '@/assets/ProfileIcon.png'
import Link from 'next/link';

export default function Header() {
    return (
        <div className={styles.h786header}>
            <div className={styles.cn786companyName}>
                <Link href="/" className={styles.h786companyNameLink}>
                    Social Seedlings
                    <Image 
                        src={SeedlingLogo} 
                        alt="Logo of Social Seedling"
                        className={styles.cl786companyLogo} 
                        width={40}
                        height={40}
                    />
                </Link>
            </div>
            <Image 
                src={ProfileIcon} 
                alt="Profile Icon of Social Seedling"
                className={styles.p786profileIcon} 
                width={30}
                height={30}
            />
        </div>
    );
}