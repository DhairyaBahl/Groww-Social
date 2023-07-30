import styles from '@/app/styles/Header.module.css';
import Image from 'next/image'
import SeedlingLogo from '@/app/assets/SeedlingLogo.png'
import ProfileIcon from '@/app/assets/ProfileIcon.png'

export default function Header() {
    return (
        <div className={styles.h786header}>
            <div className={styles.cn786companyName}>
                Social Seedlings
                <Image 
                    src={SeedlingLogo} 
                    alt="Logo of Social Seedling"
                    className={styles.cl786companyLogo} 
                    width={40}
                    height={40}
                />
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