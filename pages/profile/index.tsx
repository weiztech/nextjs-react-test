import {
  useRef,
  useState,
  useEffect,
  FormEvent,
  FC,
  memo,
  ChangeEvent,
  MouseEvent,
  useReducer,
} from "react";

import type { NextPage } from "next";

interface BaseAdditionalData {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
}

interface AdditionalData extends BaseAdditionalData {
  checked: boolean;
}

interface AdditionalDataProps {
  additional_data: AdditionalData;
  handleChange: (data: AdditionalData) => void;
}

const CheckBoxForm: FC<AdditionalDataProps> = ({
  additional_data,
  handleChange,
}) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const [checkbox, setCheckbox] = useState(additional_data.checked);
  const data = useRef<any>({
    ...additional_data,
  });

  console.log("Render CheckBoxForm", checkbox, data);

  useEffect(() => {
    [firstNameRef, lastNameRef, checkBoxRef, phoneRef, companyRef].forEach(
      (ref) => {
        if (ref.current) {
          ref.current.value =
            data.current[ref.current.name as keyof AdditionalData].toString();
        }
      }
    );
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.type == "checkbox") {
      data.current[e.currentTarget.name as keyof AdditionalData] =
        e.currentTarget.checked;
      setCheckbox(e.currentTarget.checked);
    } else {
      data.current[e.currentTarget.name as keyof AdditionalData] =
        e.currentTarget.value;
    }
    handleChange(data.current as AdditionalData);
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="checkbox-1"
          type="checkbox"
          defaultChecked={checkbox}
          name="checked"
          onChange={(e) => onChange(e)}
          ref={checkBoxRef}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="checkbox-1"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Additional Form Input.
        </label>
      </div>
      {checkbox ? (
        <>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                ref={firstNameRef}
                onChange={(e) => onChange(e)}
                name="firstName"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="lastName"
                ref={lastNameRef}
                onChange={(e) => onChange(e)}
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => onChange(e)}
                name="phone"
                ref={phoneRef}
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                Phone number (123-456-7890)
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="company"
                onChange={(e) => onChange(e)}
                ref={companyRef}
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_company"
                className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                Company (Ex. Google)
              </label>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

type AddressInputFormProps = {
  id: number;
  address?: string;
  onDelete?: (idx: number) => void;
  onChange?: (idx: number, address: string) => void;
};

const AddressInputForm = (props: AddressInputFormProps) => {
  const addressRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (addressRef.current) {
      addressRef.current.value = props.address || "";
    }
  });

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    props.onChange ? props.onChange(props.id, e.target.value || "") : null;
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onDelete ? props.onDelete(props.id) : null;
  };
  console.log("Render AddressInputForm");
  return (
    <div
      className="
            w-full xl:w-5/6 2xl:w-4/6 flex border-2 border-blue-700 border-opacity-10 mt-3 px-5 py-2 h-32 rounded-lg
            justify-items-center items-center
            "
    >
      <div className="w-11/12">
        <textarea
          name="textarea"
          ref={addressRef}
          defaultValue={props.address}
          onChange={onChange}
          className="py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Address"
        />
      </div>
      <div className="w-1/12 flex ml-10">
        <button className="" onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash text-red-800"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const MemoAddressInputForm = memo(AddressInputForm, (prev, next) => {
  // console.log("Memo Address Input", prev, next);
  return next.id === prev.id;
});

type Address = {
  name: string;
  id: number;
};

type AddressFormProps = {
  initAddress: Address[];
  doChange: (data: Address[]) => void;
};

const AddressBoxForm: FC<AddressFormProps> = ({ initAddress, doChange }) => {
  const listAddress = useRef<Address[]>([...initAddress]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log("Render AddressBoxForm", listAddress, initAddress);

  const onDelete = (id: number) => {
    listAddress.current = listAddress.current.filter((data) => data.id !== id);
    console.log("delete", listAddress);
    doChange(listAddress.current);
    forceUpdate();
  };

  const onChange = (id: number, address: string) => {
    listAddress.current.forEach((value) => {
      if (value.id == id) {
        value.name = address;
      }
    });
    console.log("change", listAddress);
  };

  return (
    <>
      <button
        onClick={() => {
          listAddress.current.push({ name: "", id: Date.now() });
          doChange(listAddress.current);
          forceUpdate();
          console.log("Add", listAddress);
        }}
        type="button"
        className="text-white bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Address
      </button>
      <div className="flex flex-col">
        {listAddress.current.map((data) => (
          <MemoAddressInputForm
            key={data.id}
            address={data.name}
            id={data.id}
            onDelete={onDelete}
            onChange={onChange}
          />
        ))}
      </div>
    </>
  );
};

const Input = (props: { name: string; type: string; label: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = `input_${props.name}`;
  console.log("Render Input ");
  return (
    <>
      <input
        type={props.type}
        ref={inputRef}
        name={props.name}
        id={uid}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={uid}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
      >
        {props.label}
      </label>
    </>
  );
};

const MemoInput = memo(Input);

type ProfileData = {
  email: string;
  password: string;
  confirm_password: string;
  additional_info?: BaseAdditionalData;
  list_address: Address[];
};

const Profile: NextPage = () => {
  const additionalData = useRef<AdditionalData>({
    firstName: "Matilda",
    lastName: "",
    checked: true,
    company: "",
    phone: "",
  });
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "",
    password: "",
    confirm_password: "",
    list_address: [],
  });
  const listAddress = useRef<Address[]>([
    {
      name: "Tsim Sha Tsui",
      id: 101,
    },
    { name: "Nathan Road, Yau Ma Tei", id: 102 },
  ]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const raw_data = new FormData(e.currentTarget);
    let formObject = Object.fromEntries(raw_data.entries());
    const data: ProfileData = {
      email: formObject.email as string,
      password: formObject.password as string,
      confirm_password: formObject.confirm_password as string,
      list_address: listAddress.current,
    };

    if (additionalData.current.checked) {
      data.additional_info = {
        company: additionalData.current.company,
        phone: additionalData.current.phone,
        firstName: additionalData.current.firstName,
        lastName: additionalData.current.lastName,
      };
    }
    // const has_checked = !!formObject.checked;
    // formObject.checked = has_checked;
    console.log("Submit", data);
    setProfileData(data);
  };

  const handleChange = (data: AdditionalData) => {
    console.log("Handle Change Parent", data);
    additionalData.current = { ...data };
  };

  const onChangeAddress = (data: Address[]) => {
    listAddress.current = data;
    console.log("Parent change address", data, listAddress);
  };

  console.log("render Login page");

  return (
    <>
      <div className="px-6 py-8 md:py-32 justify-items-center items-center">
        <div className="flex justify-center items-center flex-wrap g-6 text-gray-800">
          <div className="w-full md:w-8/12">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 mb-6 w-full group">
                <MemoInput
                  type={"text"}
                  name={"email"}
                  label={"Email Address"}
                />
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <MemoInput
                  type={"password"}
                  name={"password"}
                  label={"Password"}
                />
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <MemoInput
                  type={"password"}
                  name={"confirm_password"}
                  label={"Confirm Password"}
                />
              </div>
              <CheckBoxForm
                additional_data={additionalData.current}
                handleChange={handleChange}
              />
              <div className="relative z-0 mb-6 w-full group">
                <AddressBoxForm
                  initAddress={listAddress.current}
                  doChange={onChangeAddress}
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="mt-3">
            Submit Result: {JSON.stringify(profileData)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
