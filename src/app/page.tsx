import List from "@/components/List/List";

export default function Home() {
  return (
    <main className="flex pt-10 pl-10 overflow-auto">
      <div className="flex justify-start overflow-x-auto pb-10 gap-4">
        <List listTitle="依頼書待ち/割り振り前" />
        <List listTitle="依頼書来た/割り振り済" />
        <List listTitle="サイト文章チェック中" />
        <List listTitle="サイト文章完成" />
        <List listTitle="制作中" />
      </div>
    </main>
  );
}
