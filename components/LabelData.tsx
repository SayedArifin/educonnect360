interface LabelData {
    label: string;
    data?: string;
    content?: any;
}
const LabelData = ({ label, data, content }: LabelData) => {
    return (
        <div className="mb-4 flex items-center">
            <label className=" font-bold mr-2 ">{label}:</label>
            <div className=" relative text-pink-600">
                <p>{data}</p>
                <div className="container mx-auto whitespace-nowrap overflow-x-auto">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default LabelData;