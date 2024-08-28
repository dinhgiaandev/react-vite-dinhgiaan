import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";
import CreateBookUncontrol from "../components/book/create.book.uncontrol";

const BookPage = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadDataBook();
    }, [current, pageSize])

    const loadDataBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <CreateBookUncontrol />
            <BookTable
                dataBook={dataBook}
                loadDataBook={loadDataBook}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                setTotal={setTotal}
            />
        </div>
    )
}
export default BookPage;