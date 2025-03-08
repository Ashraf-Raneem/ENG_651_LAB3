import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { IoIosCalendar } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

const Navbar = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const transformDate = (date) => {
        if (date) {
            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short", // "short" -> Jan, "long" -> January
                day: "2-digit",
            });
            return formattedDate;
        } else return "";
    };

    const DateSelectInput = forwardRef(({ value, onClick, className }, ref) => (
        <button className={className} onClick={onClick} ref={ref}>
            <IoIosCalendar className="mr-2" /> {transformDate(startDate)} {`- ${transformDate(endDate)}`}
        </button>
    ));

    return (
        <div className="absolute top-0 right-10 p-4 flex text-white z-40">
            <div className="flex flex-row items-center">
                <CiFilter size={27} className="mr-2" />
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    customInput={
                        <DateSelectInput className="cursor-pointer rounded-xl text-sm flex flex-row items-center border border-solid border-white p-2 px-6" />
                    }
                />
            </div>
        </div>
    );
};

export default Navbar;
