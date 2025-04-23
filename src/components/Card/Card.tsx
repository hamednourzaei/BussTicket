"use client";

import CardItem from "./CardItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Ticket } from "@/lib/types";
import styles from "./CardItem.module.css";

interface CardListProps {
  sort: "asc" | "desc" | "none";
  tickets: Ticket[];
  isLoading?: boolean;
}

export default function CardList({  tickets, isLoading = false }: CardListProps) {
  if (isLoading) {
    // نمایش ۳ کارت Skeleton موقع لودینگ
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col w-[970px] gap-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col w-[970px] gap-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => <CardItem key={ticket.id} ticket={ticket} />)
        ) : (
          <p>تیکتی برای نمایش وجود ندارد.</p>
        )}
      </div>
    </div>
  );
}

// کامپوننت Skeleton برای شبیه‌سازی کارت
function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <div className={styles.companyInfo}>
            <Skeleton className="w-[150px] h-[24px]" />
            <Skeleton className="w-[60px] h-[60px]" />
          </div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.formLeft}>
          <Skeleton className="w-[120px] h-[40px] rounded-lg" />
          <Skeleton className="w-[100px] h-[20px] mt-2" />
          <div className={styles.buySection}>
            <Skeleton className="w-[100px] h-[40px] rounded-lg" />
            <Skeleton className="w-[80px] h-[24px]" />
          </div>
        </div>
        <div className={styles.formRight}>
          <div className={styles.labels}>
            <Skeleton className="w-[50px] h-[20px]" />
            <Skeleton className="w-[50px] h-[20px]" />
          </div>
          <div className={styles.tripInfo}>
            <div>
              <Skeleton className="w-[60px] h-[20px]" />
              <Skeleton className="w-[80px] h-[20px] mt-1" />
              <Skeleton className="w-[100px] h-[20px] mt-1" />
            </div>
            <div>
              <Skeleton className="w-[60px] h-[20px]" />
              <Skeleton className="w-[80px] h-[20px] mt-1" />
              <Skeleton className="w-[100px] h-[20px] mt-1" />
            </div>
          </div>
          <div className={styles.seatsInfo}>
            <div className={styles.seatsHeader}>
              <Skeleton className="w-[40px] h-[40px]" />
              <Skeleton className="w-[120px] h-[20px]" />
            </div>
            <Skeleton className="w-full h-[10px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}