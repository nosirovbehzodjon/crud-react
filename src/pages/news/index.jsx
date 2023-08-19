import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Space, Table } from "antd";
import { useRef, useState } from "react";
import { client } from "../../service/client";
import useDeleteData from "../../service/hooks/useDeleteData";
import useGetData from "../../service/hooks/useGetData";
import usePostData from "../../service/hooks/usePostData";

const News = () => {
    const { data, isError, isLoading, error } = useGetData({
        key: ["news-data"],
        url: "/news",
    });
    const {
        data: postData,
        mutateAsync: postMutateAsync,
        isLoading: postIsLaoding,
    } = usePostData({
        key: ["news-data-post"],
        url: "/news/create",
    });
    const title = useRef(null);
    const desc = useRef(null);
    const image = useRef(null);
    const {
        data: deleteData,
        isLoading: deleteLoading,
        mutateAsync,
    } = useDeleteData({
        key: ["delete-news"],
        url: "/news/delete",
    });
    const [modalOpen, setModalOpen] = useState(false);
    const columns = [
        {
            title: "Image",
            key: "img",
            render: (data) => {
                console.log(data.imgUrl);
                let img = data.imgUrl.replace(
                    "https://",
                    data.imgUrl.slice(0, 8) + "fake"
                );
                console.log(img);
                return <img src={img} className="img" alt="" />;
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "View",
            dataIndex: "view",
            key: "view",
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <a>Edit</a>
                    <Button
                        onClick={() => {
                            mutateAsync(
                                { id: record.id },
                                {
                                    onSuccess: () => {
                                        client.invalidateQueries("news-data");
                                    },
                                }
                            );
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    if (isError) {
        return <div>{error}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log("news", data);
    return (
        <div>
            <div>
                <Button type="primary" onClick={() => setModalOpen(true)}>
                    Create News
                </Button>
                <Modal
                    title="20px to Top"
                    style={{
                        height: "400px",
                    }}
                    width={"1000px"}
                    open={modalOpen}
                    onOk={false}
                    footer={false}
                    onCancel={() => setModalOpen(false)}
                >
                    <input className="input" type="text" ref={title} />
                    <input className="input" type="text" ref={desc} />
                    <input className="input" type="file" ref={image} />
                    <Button
                        type="primary"
                        onClick={() => {
                            const formData = new FormData();
                            formData.append("title", title.current.value);
                            formData.append("desc", desc.current.value);
                            formData.append("image", image.current.files[0]);
                            postMutateAsync(formData, {
                                onSuccess: () => {
                                    client.invalidateQueries("news-data");
                                },
                            });
                        }}
                    >
                        Submit
                    </Button>
                </Modal>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={data.news}
                    rowKey="title"
                />
            </div>
        </div>
    );
};
export default News;
