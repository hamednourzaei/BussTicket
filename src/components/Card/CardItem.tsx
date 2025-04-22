"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Label } from "../ui/label";
import styles from "./CardItem.module.css"; 

interface Ticket {
  id: number;
  companyTitle: string;
  price: number;
  vipText: string;
  origin: {
    city: string;
    time: string;
    date: string;
  };
  destination: {
    city: string;
    time: string;
    date: string;
  };
  availableSeats: number; 
}

export default function CardItem({ ticket }: { ticket: Ticket }) {
  const totalSeats = 100; 
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const filledSeats = totalSeats - ticket.availableSeats;
    const progressValue = (filledSeats / totalSeats) * 100;
    setProgress(progressValue);
  }, [ticket.availableSeats]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/">
            <Image
              src="/ImageIcon/GoBackBlue.svg"
              alt="بازگشت به صفحه اصلی"
              width={30}
              height={30}
            />
          </Link>
          <div className={styles.companyInfo}>
            <h2 className={styles.companyTitle}>{ticket.companyTitle}</h2>
            <Link href="/">
              <Image
                src="/ImageIcon/GitiNavard.svg"
                alt="لوگو گیتی‌نورد"
                width={60}
                height={60}
              />
            </Link>
          </div>
        </div>
      </div>

      <Card className={styles.card}>
        <CardContent>
          <div className={styles.cardContent}>
            <form className={styles.formLeft}>
              <button className={styles.refundButton}>قوانین استرداد</button>
              <p className={styles.vipText}>{ticket.vipText}</p>
              <div className={styles.buySection}>
                <button className={styles.buyButton}>خرید بلیط</button>
                <span className={styles.price}>
                  تومان {ticket.price.toLocaleString()}
                </span>
              </div>
            </form>

            <form className={styles.formRight}>
              <div className={styles.labels}>
                <div className={styles.label}>
                  <Label htmlFor="origin" className="font-vazir">
                    مبدا
                  </Label>
                </div>
                <div className={styles.label}>
                  <Label htmlFor="destination" className="font-vazir">
                    مقصد
                  </Label>
                </div>
              </div>

              <div className={styles.tripInfo}>
                <div>
                  <p>{ticket.origin.time}</p>
                  <p>{ticket.origin.date}</p>
                  <span>{ticket.origin.city}</span>
                </div>
                <div>
                  <p>{ticket.destination.time}</p>
                  <p>{ticket.destination.date}</p>
                  <span>{ticket.destination.city}</span>
                </div>
              </div>

              <div className={styles.seatsInfo}>
                <div className={styles.seatsHeader}>
                  <Image
                    src="/ImageIcon/Chairs.svg"
                    alt="آیکون صندلی‌ها"
                    width={40}
                    height={40}
                  />
                  <span className={styles["progress-text"]}>
                    {ticket.availableSeats} : صندلی خالی باقی مانده
                  </span>
                </div>
                <div className={styles["progress-container"]}>
                  <div className={styles["progress-bar"]}>
                    <div
                      className={styles["progress-fill"]}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}