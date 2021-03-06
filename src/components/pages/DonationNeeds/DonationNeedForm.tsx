import React, { FormEvent, useState, InputHTMLAttributes, useEffect } from 'react';
import '@material/form-field/dist/mdc.form-field.css';
import './DonationNeedForm.css';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DonationNeedMessage } from '../../../messages/DonationNeedMessage';
import { DonationNeedService } from '../../../services/DonationNeedService';
import { ManagerService } from '../../../services/ManagerService';
import { TextField, FormControl, makeStyles, Button, Input, Icon, Grid, Typography, Select, MenuItem, InputLabel } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DonationItem } from '../../../models/DonationItem';
import { DonationItemService } from '../../../services/DonationItemService';
import { match } from 'react-router';
import { DonationNeed } from '../../../models/DonationNeed';

interface DonationIntentionFormRouteParams {
  id: string
}

const DonationIntentionForm: React.FC<RouteComponentProps> = (props, context) => {

  const initialDonationItem = {
    _id: "",
    itemName: "",
    itemDescription: "",
    itemUOM: ""
  }

  const [donationItems, setDonationItems] = useState<DonationItem[]>([]);
  const [donationNeedId, setDonationNeedId] = useState<string | undefined>(undefined);
  const [selectedDonationItem, setSelectedDonationItem] = useState<Partial<DonationItem>>(initialDonationItem);
  const [donationItemQuantity, setDonationItemQuantity] = useState<number>(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const dateCreationDate = new Date();
    const loggedManager = await ManagerService.getLoggedManager();

    const donationNeed = {
      _id: donationNeedId,
      dateCreationDate,
      donationItem: selectedDonationItem._id,
      itemQuantity: donationItemQuantity,
      loggedManager: loggedManager._id
    }

    saveDonationNeed(donationNeed);
  }

  const saveDonationNeed = async (donationNeed: object) => {
    await DonationNeedService.createDonationNeed(donationNeed).then(() => {
      alert(DonationNeedMessage.CreatedSuccessfully);
      redirectToDonationNeeds();
    }).catch(err => {
      console.log(err);
    });
  }

  const redirectToDonationNeeds = () => {
    const { history } = props;
    if(history) {
      history.push("/donationsNeeds");
    }
  }

  const handleDonationItemChange = async (event: any) => {
    let donationItem = await DonationItemService.getDonationItemById(event.target.value);
    if (!donationItem) {
      donationItem = initialDonationItem;
    }
    setSelectedDonationItem(donationItem);
  };

  const handleDonationItemQuantityChange = async (event: any) => {
    setDonationItemQuantity(event.target.valueAsNumber);
  };

  async function fetchAllDonationItems(): Promise<void> {
    const donationItems = await DonationItemService.getAllDonationItems();
    setDonationItems(donationItems);
  }

  const handleFormRoute = async (match: match<DonationIntentionFormRouteParams>): Promise<void> => {
    if (match.params.id) {
      const donationNeedId = match.params.id;
      const donationNeed = await DonationNeedService.getDonationNeedById(donationNeedId);
      if (donationNeed) {
        setDonationNeedId(donationNeed._id);
        setSelectedDonationItem(donationNeed.donationItem);
        setDonationItemQuantity(donationNeed.itemQuantity);
      } else {
        alert (DonationNeedMessage.InvalidDonationNeed)
        redirectToDonationNeeds();
      }
    }
  };

  useEffect(() => {
    fetchAllDonationItems();
    handleFormRoute(props.match as match<DonationIntentionFormRouteParams>);
  }, [ ]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '60vh'}}
    >
      <Typography variant="h5" component="h2">
        Cadastro de Necessidade de Doação
      </Typography>
      <br/>
      <form onSubmit={handleSubmit} className="DonationNeedForm-Form">
        <FormControl>
          <InputLabel id="idDonationItemSelectLabel">Item</InputLabel>
          <Select
            labelId="idDonationItemSelectLabel"
            id="idDonationItemSelect"
            onChange={handleDonationItemChange}
            value={selectedDonationItem._id}
          >
            { donationItems.map(donationItem =>
              <MenuItem value={donationItem._id}>{donationItem.itemName}</MenuItem>
            )}
          </Select>
          <TextField
            id="idItemQuantityTextField"
            label="Quantidade"
            defaultValue="0"
            value={donationItemQuantity}
            helperText={selectedDonationItem.itemUOM}
            margin="normal"
            type="number"
            onChange={handleDonationItemQuantityChange}
          />
          <br/>
          <Button  id="idSubmit"
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<CloudUploadIcon/>}>
            Publicar Necessidade
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
}

export default withRouter(DonationIntentionForm);
