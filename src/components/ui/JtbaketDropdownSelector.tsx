import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type CQDDropdownType = {
  id: number;
  name: string;
  value: string | number; // Disallow boolean or undefined here for safety
};

const JtbaketDropdownSelector = ({
  list,
  selectedValue,
  onValueChange,
  placeholderText,
}: {
  list: CQDDropdownType[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  placeholderText?: string;
}) => {
  return (
    <Select
      value={selectedValue.toString()} // Normalize to string for internal handling
      onValueChange={(val) => {
        const numVal = Number(val);
        onValueChange(isNaN(numVal) ? val : numVal);
      }}
    >
      <SelectTrigger className="h-[49px] w-[200px] bg-white border border-[#E6E6E6] rounded-[8px] text-[#0E2A5C] text-base focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0">
        <SelectValue className="placeholder:text-primary" placeholder={placeholderText ?? "Select"} />
      </SelectTrigger>
      <SelectContent className="w-fit *:p-0">
        <SelectGroup>
          {list
            .filter((item) => item.value !== "" && item.value !== undefined)
            .map((item) => (
              <SelectItem
                key={item.id}
                value={item.value.toString()} // Ensure value is a valid string
                className="text-[#0E2A5C] font-normal text-[16px] leading-normal"
              >
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default JtbaketDropdownSelector;
