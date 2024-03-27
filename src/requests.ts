import axios from 'axios';
import { CityItemType, NewTenderFormType, TenderStatus } from './types';
import { CustomFileCardItem } from './components/FileUpload/CustomFileCardItem';

const idToken = localStorage.getItem('id_token');

export const addNewTender = ({
  formData,
  cityData,
  tenderAttachments,
  addressValue,
  commentsValue,
  tenderStatus,
  filesDirectoryId,
  username,
}: {
  formData: NewTenderFormType;
  cityData?: CityItemType;
  tenderAttachments?: CustomFileCardItem[];
  addressValue?: string;
  commentsValue?: string;
  tenderStatus?: TenderStatus;
  filesDirectoryId?: string;
  username?: string;
}) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/tenders`,
    {
      title: formData?.tenderTitle,
      description: formData?.tenderDescription,
      submissionStart: formData?.tenderValidity?.from,
      submissionEnd: formData?.tenderValidity?.to,
      expectedDelivery: formData?.tenderExpectedDelivery,
      category: formData?.tenderCategory,
      locationLeafId: cityData?.id,
      location: {
        nestedLocation: {
          name: cityData?.name,
          id: cityData?.id,
        },
        geoPosition: {
          latitude: cityData?.lat,
          longitude: cityData?.lng,
        },
        addressLine: addressValue,
        addressComment: commentsValue,
      },
      ownerName: `${formData?.ownerFirstName} ${formData?.ownerLastName}`,
      ownerId: username,
      organization: formData?.ownerOrganization,
      showEmail: formData?.emailSharingAgreement,
      files: tenderAttachments?.map((attachment) => attachment.path),
      snapFiles: tenderAttachments?.map((attachment) => attachment.snapPath),
      status: tenderStatus,
      filesDirectoryId,
    },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
};

export const getCityList = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/cities`)
    .then((response) => response.data);
};

export const getTenders = (page: number) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/tenders?page=${page}`);
};
