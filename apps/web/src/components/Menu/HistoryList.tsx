import { history } from "@/functions/history";
import { type Post } from "@repo/db/data";
import { LinkList } from "./LinkList";
import { SummaryItem } from "./SummaryItem";

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function HistoryList({
  selectedYear,
  selectedMonth,
  posts,
}: {
  selectedYear?: string;
  selectedMonth?: string;
  posts: Post[];
}) {
  const historyItems = history(posts);

  // TODO: use the "history" function on "functions" directory to get the history
  //       and render all history items using the SummaryItem component
  return (
    <LinkList title="History">
      {historyItems.map((item) => (
        <SummaryItem
          key={`${item.year}-${item.month}`}
          count={item.count}
          name={`${months[item.month]}, ${item.year}`}
          isSelected={
            selectedYear === String(item.year) &&
            selectedMonth === String(item.month)
          }
          link={`/history/${item.year}/${item.month}`}
          title={`History / ${months[item.month]}, ${item.year}`}
        />
      ))}
    </LinkList>
  )
}
