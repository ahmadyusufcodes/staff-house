import React from "react";
import Table from "../table/Table";
import FilterRequests from "./FilterRequests";
import api from "../../utils/http-common";
import { toast } from "react-toastify";
import TextField from "../inputs/TextField";

interface IReviewModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  request: any;
  handleSetRequest: (key: string, value: any) => void;
  onAction: () => void;
}

const ReviewModal = ({
  open,
  setOpen,
  request,
  handleSetRequest,
  onAction,
}: IReviewModal) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold text-lg">Review Request</h1>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col w-1/2">
                    <TextField
                      label="House"
                      value={request.house_desc}
                      rounded="lg"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <TextField
                      label="Staff Name"
                      value={request.staff_name}
                      rounded="lg"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col w-1/2">
                    <TextField
                      label="Staff Email"
                      value={request.staff_email}
                      rounded="lg"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <TextField
                      label="Staff Department"
                      value={request.staff_dept}
                      rounded="lg"
                      onChange={(e) => handleSetRequest("staff_dept", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="font-bold text-[#747E88]">
                      Request Status
                    </label>
                    <select
                      className="appearance-none bg-gray-50 border w-full py-3 px-3 border-gray-300 rounded-lg mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline autofill:bg-transparent"
                      value={request.status}
                      onChange={(e) =>
                        handleSetRequest("status", e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row justify-end">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700"
              onClick={onAction}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IRequestsPage {
    _id: string;
    status: string;
  }

export default function RequestsPage() {
  const [requests, setRequests] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    total: 0,
    limit: 10,
  });
  const [loading, setLoading] = React.useState(true);
  const [editRequest, setEditRequest] = React.useState<IRequestsPage | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const handleSetRequest = (key: string, value: any) => {
    setEditRequest({ ...editRequest, [key]: value } as any);
  };

  const handleReview = () => {
    api
      .put(`/request/review/${editRequest?._id as any}`, {
        status: String(editRequest?.status as any).toLowerCase(),
      })
      .then((res) => {
        console.log(res);
        setEditRequest(null);
        setShowEditModal(false);
        toast.success("House updated successfully");
        fetchRequests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRequests = () => {
    api
      .get("/request")
      .then((res) => {
        setRequests(res.data.data.requests);
        console.log(res.data.data.requests);
        setPagination(res.data.data.pagination);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="w-max h-max">
      {editRequest && (
        <ReviewModal
          open={showEditModal}
          setOpen={setShowEditModal}
          request={editRequest}
          handleSetRequest={handleSetRequest}
          onAction={handleReview}
        />
      )}
      <Table
        filterComponent={<FilterRequests />}
        columns={[
          { label: "House", key: "house_desc" },
          { label: "Staff Name", key: "staff_name" },
          { label: "Staff Email", key: "staff_email" },
          { label: "Request Status", key: "status" },
        ]}
        data={loading ? [] : requests}
        actions={[
          {
            label: "Review",
            onClick: (request) => {
              setEditRequest(request);
              setShowEditModal(true);
            },
          },
        ]}
        pagination={{
          ...pagination,
          onChange: (page) => {
            setLoading(true);
            api
              .get(`/request?page=${page}`)
              .then((res) => {
                setRequests(res.data.data.requests);
                setPagination(res.data.data.pagination);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          },
        }}
      />
    </div>
  );
}
