import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import { ChannelList } from "../components/ChannelList";
import SearchModal from "../components/modals/SearchModal";
import useWindowSize from "../hooks/useWindowSize";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllSubscription, UnsuscribeChannels } from "../utils";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import UnsubscribeListModal from "../components/modals/UnsubscribeListModal";
import SkeletonLoader from "../components/SkeletonLoader";
import Footer from "../components/Footer";

export default function DashBoard() {
  // ====================== STATES ======================
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [toggleSearchModal, setToggleSearchModal] = useState(false);
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [isUnSubListModal, setIsUnsubscribeListModalOpen] = useState(false);

  // ====================== CUSTOM HOOKS & CONTEXT ======================
  const { userInfo, token } = useUserContext();
  const navigate = useNavigate();
  const { width } = useWindowSize();

  // ====================== DERIVED VALUES ======================
  const selectedChannels = useMemo(() => {
    return data
      .filter((d) => selectedIds.has(d.id))
      .map((d) => ({
        id: d.id,
        title: d.snippet.title,
        channelId: d.snippet.resourceId.channelId,
        img: d.snippet.thumbnails.default.url,
        customUrl: d.details?.snippet?.customUrl,
        description: d.snippet.description,
        subCount: d.details.statistics.subscriberCount,
        videoCount: d.details.statistics.videoCount,
      }));
  }, [data, selectedIds]);

  const channelPerPage = 10;
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * channelPerPage;
    const endIndex = startIndex + channelPerPage;
    return data.slice(startIndex, endIndex);
  }, [page, data]);

  const totalpages = useMemo(() => {
    return Math.ceil(data.length / channelPerPage);
  }, [data]);

  // ====================== HANDLERS ======================
  const handleToggleChannel = useCallback(
    (channelId) => {
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(channelId)) {
          newSet.delete(channelId);
        } else {
          if (selectedIds.size >= 10) {
            toast.error("You can only select 10 channels at a time.");
            return prev;
          }
          newSet.add(channelId);
        }
        return newSet;
      });
    },
    [selectedIds.size]
  );

  const handleUnsubscribe = useCallback(async () => {
    const numUnsubscribed = selectedIds.size;

    if (numUnsubscribed === 0) {
      toast.info("No channels selected.");
      setIsUnsubscribeModalOpen(false);
      return;
    }

    if (numUnsubscribed > 10) {
      toast.error("Cannot unsubscribe more than 10 channels at once");
      return;
    }

    setIsUnsubscribing(true);
    try {
      const deletedResponse = await UnsuscribeChannels(
        Array.from(selectedIds),
        token
      );

      if (deletedResponse) {
        const updatedData = data.filter((item) => !selectedIds.has(item.id));

        const key = `${userInfo.email}_data`;
        localStorage.setItem(key, JSON.stringify(updatedData));

        setData(updatedData);
        setSelectedIds(new Set());

        toast.success(
          `${numUnsubscribed} channel(s) unsubscribed successfully`
        );
      } else {
        toast.error("Failed to unsubscribe from channels");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error(
        "Failed to unsubscribe: " + (error.message || "Unknown error")
      );
    } finally {
      setIsUnsubscribing(false);
      setIsUnsubscribeModalOpen(false);
    }
  }, [data, selectedIds, token, userInfo?.email]);

  const toggleModal = useCallback(() => {
    setToggleSearchModal((prev) => !prev);
  }, []);

  

  const toggleUnSubModal = useCallback(() => {
    setIsUnsubscribeListModalOpen((prev) => !prev);
  }, []);

  const handleToggleUnsuscribe = useCallback(() => {
    setIsUnsubscribeModalOpen((prev) => !prev);
  }, []);

  // ====================== EFFECTS ======================
  useEffect(() => {
    if (!token || !userInfo) {
      navigate("/");
      return;
    }
  }, [navigate, token, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo?.email) return;

      setIsLoading(true);
      try {
        const currentUserKey = `${userInfo.email}_data`;
        const savedData = localStorage.getItem(currentUserKey);

        const allKeys = Object.keys(localStorage);
        allKeys.forEach((key) => {
          if (key.endsWith("_data") && key !== currentUserKey) {
            localStorage.removeItem(key);
          }
        });

        if (savedData) {
          setData(JSON.parse(savedData));
          console.log("Fetching from localStorage");
          toast.success(`Welcome back, ${userInfo?.name}!`);
        } else {
          const subs = await fetchAllSubscription(token);
          localStorage.setItem(currentUserKey, JSON.stringify(subs));
          setData(subs);
          console.log("Fetched new data from API");
          toast.success("Logged In Successfully");
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("Failed to load subscriptions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userInfo?.email, userInfo?.name, token]);

  // ====================== RENDER ======================
  return (
    <>
      <div>
        <Toaster position="bottom-right" reverseOrder={true} />
      </div>
      {userInfo && (
        <>
          {/* Header is now outside the relative container */}
          <Header
            totalSubscriptions={data.length}
            selectedCount={selectedIds.size}
            currentPage={page}
            totalPages={totalpages}
            handleSearchClick={toggleModal}
            onPageChange={(page) => setPage(page)}
            handleToggleUnsuscribe={handleToggleUnsuscribe}
            isUnsubscribing={isUnsubscribing}
            toggleUnSubModal={toggleUnSubModal}
            isLoading={isLoading}
            width={width}

          />
          {/* Main content with relative positioning */}
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative`}>
            {toggleSearchModal && (
              <SearchModal
                handleToggleChannel={handleToggleChannel}
                onClick={toggleModal}
                data={data}
                selectedIds={selectedIds}
              />
            )}
            {isUnSubListModal && (
              <UnsubscribeListModal
                data={selectedChannels}
                selectedIds={selectedIds}
                toggleUnSubModal={toggleUnSubModal}
                handleToggleChannel={handleToggleChannel}
              />
            )}
            {isUnsubscribeModalOpen && (
              <ConfirmationModal
              conditiontoAnimate={isUnsubscribeModalOpen}
              key="unsubModel"
                title="Are you sure?"
                message={`“You are unsubscribing ${selectedIds.size} channel${
                  selectedIds.size !== 1 ? "s" : "" 
                }. This action cannot be undone.”`}
                onConfirm={handleUnsubscribe}
                onCancel={handleToggleUnsuscribe}
                confirmText="Yes, Unsubscribe"
                cancelText="No, Cancel"
              />
            )}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="overflow-y-auto max-h-screen w-full relative">
                <ChannelList
                  data={ paginatedData}
                  selectedIds={selectedIds}
                  onToggle={handleToggleChannel}
                />
              </div>
            )}
          </div>
        </>
      )}
      <Footer/>
    </>
  );
}