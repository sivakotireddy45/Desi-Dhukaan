

import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-green-50 to-cyan-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Desi Dukaan — Admin Dashboard
        </h1>

        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />

        <Button
          onClick={handleUploadFeatureImage}
          className="mt-5 w-full bg-gradient-to-r from-cyan-400 to-green-400 hover:from-cyan-500 hover:to-green-500 text-white font-semibold"
        >
          Upload
        </Button>

        <div className="flex flex-col gap-4 mt-8">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((featureImgItem, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden shadow-md">
                  <img
                    src={featureImgItem.image}
                    alt="Feature"
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))
            : (
              <p className="text-gray-500 text-center">
                No feature images uploaded yet.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
