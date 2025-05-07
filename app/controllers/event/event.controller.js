const eventService = require('../../services/event/event.service');
const registerService = require('../../services/register/register.service');
const paymentService = require('../../services/register/register.service');
const attendanceService = require('../../services/register/register.service');
const AllccavpaymentService = require('../../services/register/register.service');

exports.allEvent = (req, res) => {
    eventService.allEvent(req,res);
  };
  exports.getOneEvent = (req, res) => {
    eventService.getOneEvent(req,res);
  };
  exports.createEvent = (req, res) => {
    eventService.createEvent(req,res);
  };
  exports.updateEventStatus = (req, res) => {
    eventService.updateEventStatus(req,res);
  };
  //
  exports.updateEvent = (req, res) => {
    eventService.updateEvent(req,res);
  };
  exports.holdEvent = (req, res) => {
    eventService.holdEvent(req,res);
  };
  exports.cancelEvent = (req, res) => {
    eventService.cancelEvent(req,res);
  };
  exports.createPriceMaster = (req, res) => {
    eventService.createPriceMaster(req,res);
  };
  exports.createEventWithPricing = (req, res) => {
    eventService.createEventWithPricing(req,res);
  };
  exports.findOneDraftEvent = (req, res) => {
    eventService.findOneDraftEvent(req,res);
  };
  exports.createEventWithPricings = (req, res) => {
    eventService.createEventWithPricings(req,res);
  };
  exports.findAllEventPricesWithMastery = (req, res) => {
    eventService.findAllEventPricesWithMastery(req,res);
  };
  exports.updatePublishEventStatus = (req, res) => {
    eventService.updatePublishEventStatus(req,res);
  };
   exports.updateFreeEventStatus = (req, res) => {
    eventService.updateFreeEventStatus(req,res);
  };
  exports.findAllEventsWithData = (req, res) => {  
    eventService.findAllEventsWithData(req,res);
  };
  exports. findAllFreeEventWithData = (req, res) => {   
    eventService. findAllFreeEventWithData(req,res);
  };
  exports. findOneFreeEvent = (req, res) => {   
    eventService. findOneFreeEvent(req,res);
  };
  exports.findAllStatus = (req, res) => {
    eventService.findAllStatus(req,res);
  };
  exports.findOneEvent = (req, res) => {
    eventService.findOneEvent(req,res);
  };
  exports.createStatus = (req, res) => {
    eventService.createStatus(req,res);
  };
  exports.getActiveEvents = (req, res) => {
    eventService.getActiveEvents(req,res);
  };
  exports.findAllDraftWithData = (req, res) => {
    eventService.findAllDraftWithData(req,res);
  };
  exports.completeEvent = (req, res) => {
    eventService.completeEvent(req,res);
  };
  exports.spotEvent = (req, res) => {
    eventService.spotEvent(req,res);
  };
exports.findAllPastEvents = (req, res) => {
  eventService.findAllPastEvents(req,res);
  };
exports.findOnePastEvent = (req, res) => {
  eventService.findOnePastEvent(req, res);
}; 
exports.imageUpload = (req, res) => {
  eventService.imageUpload(req, res);
};
exports.imageRetrieve = (req, res) => {
  eventService.imageRetrieve(req, res);
};
  exports.createRegister = (req, res) => {   
    registerService.createRegister(req,res);
  };
   exports.FreeFormcreateRegister = (req, res) => {  
    registerService. FreeFormcreateRegister(req,res);
  };
  exports.createUserSpotRegister = (req, res) => {
    registerService.createUserSpotRegister(req,res);
  };
  exports.findAllRegisteredParticipants = (req, res) => {
    registerService.findAllRegisteredParticipants(req,res);
  };
  exports.findAllGKRegisteredParticipants = (req, res) => {
    registerService.findAllGKRegisteredParticipants(req,res);
  };
  exports.findAllRegisteredParticipantsCounts = (req, res) => {
    registerService.findAllRegisteredParticipantsCounts(req,res);
  };
  exports.findRegisteredParticipantsByUserToken = (req, res) => {
    registerService.findRegisteredParticipantsByUserToken(req,res);
  };
  exports.updateRegister = (req, res) => {
    registerService.updateRegister(req,res);
  };
 exports.createGurukulakalviRegister = (req, res) => {
    registerService.createGurukulakalviRegister(req,res);
  };
  exports.findParticipantsByRegisterToken = (req, res) => {
    registerService.findParticipantsByRegisterToken(req,res);
  };
  exports.findParticipantsByRegisterTokenInvoice = (req, res) => {
    registerService.findParticipantsByRegisterTokenInvoice(req,res);
  };
  exports.updatePaymentStatusByRegisterToken = (req, res) => {
    registerService.updatePaymentStatusByRegisterToken(req,res);
  };
  exports.findParticipantsByRegisterCode = (req, res) => {
    registerService.findParticipantsByRegisterCode(req,res);
  };
  exports.attendanceRecord = (req, res) => {
    registerService.attendanceRecord(req,res);
  };
  exports.findParticipantsByUserToken = (req, res) => {
    registerService.findParticipantsByUserToken(req,res);
  };
  exports.findParticipantsByUserEmail = (req, res) => {
    registerService.findParticipantsByUserEmail(req,res);
  };
  exports.spotRegister = (req, res) => {
    registerService.spotRegister(req,res);
  };
exports.contactus = (req, res) => {
  registerService.contactus(req, res);
};

  // exports.getFormDetails = (req, res) => {
  //   formService.getFormDetails(req,res);
  // };
  // exports.getOneForm = (req, res) => {
  //   formService.getOneForm(req,res);
  // };

  exports.createpayment = (req, res) => {
    paymentService.createpayment(req,res);
    console.log('controller response :',res);
  };
exports.PaymentFailed = (req, res) => {
  paymentService.PaymentFailed(req, res);
  console.log('controller response :', res);
};

  exports.getPastEvents = (req, res) => {
    eventService.getPastEvents(req,res);
  };

  exports.getNextEvent = (req, res) => {
    eventService.getNextEvent(req,res);
  };

  exports.getCurrentAndNextEvent = (req, res) => {
    eventService.getCurrentAndNextEvent(req,res);
  };
  

  exports.createOneParticipantsByRegisterCodeForAtd = (req, res) => {
    attendanceService.createOneParticipantsByRegisterCodeForAtd(req,res);
  };

exports.FindccavPaymentInfo = (req, res) => {
  AllccavpaymentService.FindccavPaymentInfo(req, res);
};
  
  // exports.getFormPaymentDetails = (req, res) => {
  //   formService.getFormPaymentDetails(req,res);
  // };

  // exports.findAllEventBookedData = (req, res) => {
  //   formService.findAllEventBookedData(req,res);
  // };

  // exports.eventCount = (req, res) => {
  //   formService.eventCount(req,res);
  // };

  // exports.createFormSpotEntry = (req, res) => {
  //   formService.createFormSpotEntry(req,res);
  // };

  // exports.getRegisterIdDetails = (req, res) => {
  //   formService.getRegisterIdDetails(req,res);
  // };
  // exports.getPrimaryParticipantIdDetails = (req, res) => {
  //   formService.getPrimaryParticipantIdDetails(req,res);
  // };
  
  // exports.getSecondaryParticipantIdDetails = (req, res) => {
  //   formService.getSecondaryParticipantIdDetails(req,res);
  // };

  
  // exports.createAdminFormSpotEntry = (req, res) => {
  //   formService.createAdminFormSpotEntry(req,res);
  // };