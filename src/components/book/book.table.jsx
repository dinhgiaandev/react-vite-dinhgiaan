import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import { useState } from "react";
import BookDetail from "./book.detail";
import CreateBookUncontrol from "./create.book.uncontrol";

const BookTable = (props) => {

    const { dataBook, loadDataBook, current, setCurrent, pageSize, setPageSize, total } = props;

    const [isBookDetailOpen, setIsBookDetailOpen] = useState(false)
    const [bookDetail, setBookDetail] = useState("")

    const columns = [
        {
            title: "No.",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a
                            href="#"
                            onClick={() => {
                                setIsBookDetailOpen(true)
                                setBookDetail(record)
                            }}
                        > {record._id}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (money) => {
                if (money)
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }).format(money)

            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined />
                    <DeleteOutlined />
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log(">>> check: ", { pagination, filters, sorter, extra })
        //nếu thay đổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current != +current) // != current | current này là current bộ nhớ của React
                setCurrent(+pagination.current) //dấu + giúp thay đổi từ string sang số nguyên, ví dụ "5" = 5 Check Network để rõ hơn. Phần: data.meta, current là string, còn total là số nguyên
        }

        //nếu thay đổi tổng số phần tử trang: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != +pageSize) // != pageSize | pageSize này là pageSize bộ nhớ của React
                setPageSize(+pagination.pageSize) // dấu + giúp thay đổi từ string sang số nguyên. Check Network để rõ hơn. Phần: data.meta, pageSize là string, còn total là số nguyên
        }
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} on {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />;

            <BookDetail
                isBookDetailOpen={isBookDetailOpen}
                setIsBookDetailOpen={setIsBookDetailOpen}
                bookDetail={bookDetail}
                setBookDetail={setBookDetail}
                loadDataBook={loadDataBook}
            />
        </>
    )
}

export default BookTable;