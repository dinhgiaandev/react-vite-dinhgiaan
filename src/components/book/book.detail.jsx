import { Card, Drawer, Space } from "antd";

const BookDetail = (props) => {

    const { isBookDetailOpen, setIsBookDetailOpen, bookDetail, setBookDetail } = props

    return (
        <Drawer
            width={"20vw"}
            title="User Detail"
            onClose={() => {
                setBookDetail(null)
                setIsBookDetailOpen(false)
            }}
            open={isBookDetailOpen}
        >
            {bookDetail
                ?
                <>
                    <p>Id: {bookDetail._id}</p>
                    <p>Title: {bookDetail.mainText}</p>
                    <p>Author: {bookDetail.author}</p>
                    <p>Genes: {bookDetail.category}</p>
                    <p>Price: {bookDetail.price}</p>
                    <p>Quantity: {bookDetail.quantity}</p>
                    <p>Sold: {bookDetail.sold}</p>
                    <p>Thumbnail:</p>
                    <div style={{
                        marginTop: "10px",
                        height: "150px", width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail.thumbnail}`} />
                    </div>
                </>
                :
                <div>No Data.</div>
            }
        </Drawer>
    )
}

export default BookDetail;