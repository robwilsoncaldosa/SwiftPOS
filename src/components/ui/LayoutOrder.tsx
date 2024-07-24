import { FormData } from "@/app/page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const LayoutOrder = async () => {
  const response = await fetch("http://localhost:3000/api", {
    next: { revalidate: 1 },
  });
  const datas: FormData[] = await response.json();
  const totalAmount = datas
    .reduce((acc, data) => acc + +data.amount.replace(",", ""), 0)
    .toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  return (
    <Table className="border w-max">
      <TableCaption>A list of your Layout Form.</TableCaption>
      <TableHeader className="border">
        <TableRow>
          <TableHead className="font-semibold">Job Order</TableHead>
          <TableHead className="font-semibold">Name of Client</TableHead>
          <TableHead className="font-semibold">Amount</TableHead>
          <TableHead className="font-semibold">Page</TableHead>
          <TableHead className="font-semibold">Assigned Admin</TableHead>
          <TableHead className="font-semibold">Assigned Artist</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((data: FormData) => (
          <TableRow key={data.jobOrder}>
            <TableCell>{data.jobOrder}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.amount}</TableCell>
            <TableCell>{data.page}</TableCell>
            <TableCell>{data.admin}</TableCell>
            <TableCell>{data.artist}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell colSpan={3}>Total:{totalAmount}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default LayoutOrder;
