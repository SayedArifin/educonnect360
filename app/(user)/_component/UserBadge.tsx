import { RiAdminLine } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
interface VerifiedBadgeProps {
    role: string;
    username: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ role, username }) => {
    let content;
    if (role === "1") {
        content = "University Representative"
    } else if (role === "2") {
        content = "Administrator"
    }


    return (
        <div className="flex gap-1 justify-center items-center">
            <p>{username}</p>
            <Tooltip content={content} >
                <div>
                    {role === "0" && ""}
                    {role === "1" && <MdOutlineVerified />}
                    {role === "2" && <RiAdminLine />}
                </div>
            </Tooltip>
        </div>
    );
};

export default VerifiedBadge;