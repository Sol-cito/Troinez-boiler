'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from 'next-intl';
import { SHOP_DROPDOWN_LIST } from '@/common/shopDropdownList';
import Image from 'next/image';
import styles from './header.module.scss';
import DropdownMenu from '../dropdown/dropdownMenu';
import DropdownBox from '../dropdown/dropdownBox';

function Header({
  isLogin,
  token,
  username,
}: {
  isLogin: boolean;
  token: string | undefined;
  username: string | undefined;
}) {
  const locale: string = useLocale();
  const switchLocale = (): string => (locale === 'ko' ? 'en' : 'ko');

  const logOutUri = process.env.NEXT_PUBLIC_NAVER_LOGOUT_REQUEST_URI;

  let loginoutLink;
  let usernameBtn;
  if (isLogin) {
    usernameBtn = (
      <Link href="#none" className={styles.menu_btn}>
        <strong>{username}</strong>님 환영합니다.
      </Link>
    );
    loginoutLink = (
      <Link href={`${logOutUri}?token=${token}`} className={styles.menu_btn}>
        LOGOUT
      </Link>
    );
  } else {
    usernameBtn = '';
    loginoutLink = (
      <Link href={`/${locale}/login`} className={styles.menu_btn}>
        LOGIN
      </Link>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href={`/${locale}`} className={styles.logo}>
            <Image
              className={styles.logo__image}
              src="/common/logo/logo_text.png"
              alt="TROIS NEZ"
              quality={100}
              fill
            />
          </Link>
        </div>
        <div className={styles.right}>
          {usernameBtn}
          <Link href={`/${switchLocale()}`} className={styles.menu_btn}>
            {locale.toLocaleUpperCase()}
          </Link>
          <DropdownBox
            dropdownMenus={SHOP_DROPDOWN_LIST.map((ele) => (
              <DropdownMenu key={ele.href} title={ele.title} href={ele.href} />
            ))}
          >
            <Link href={`/${locale}`} className={styles.menu_btn}>
              SHOP
            </Link>
          </DropdownBox>
          <Link href={`/${locale}/about`} className={styles.menu_btn}>
            ABOUT
          </Link>
          {loginoutLink}
          <Link href={`/${locale}`} className={styles.menu_btn}>
            CART
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
