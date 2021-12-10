import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

export const joinClass = (
  meetingId:string, 
  className:string, 
  participantName:string
) => {
  const apiKey = "955bb5a9-5759-4dcb-99cb-39d2032a5141";

  const config = {
    name: participantName,
    meetingId: meetingId,
    apiKey: apiKey,

    poweredBy: false,
    
    containerId: "livestream",
    redirectOnLeave: window.location.href,

    micEnabled: true,
    webcamEnabled: true,
    participantCanToggleSelfWebcam: true,
    participantCanToggleSelfMic: true,

    chatEnabled: true,
    screenShareEnabled: true,
    pollEnabled: false,
    whiteBoardEnabled: true,
    raiseHandEnabled: true,

    recordingEnabled: false,
    recordingEnabledByDefault: false,
    recordingWebhookUrl: "https://www.videosdk.live/callback",
    participantCanToggleRecording: true,

    brandingEnabled: false,
    brandLogoURL: "https://picsum.photos/200",
    brandName: className,

    participantCanLeave: true, // if false, leave button won't be visible

    livestream: {
      autoStart: true,
      outputs: [
        // {
        //   url: "rtmp://x.rtmp.youtube.com/live2",
        //   streamKey: "<STREAM KEY FROM YOUTUBE>",
        // },
      ],
    },

    permissions: {
      askToJoin: false, // Ask joined participants for entry in meeting
      toggleParticipantMic: true, // Can toggle other participant's mic
      toggleParticipantWebcam: true, // Can toggle other participant's webcam
    },

    joinScreen: {
      visible: false, // Show the join screen ?
      title: className, // Meeting title
      meetingUrl: window.location.href, // Meeting joining url
    },

    pin: {
      allowed: true, // participant can pin any participant in meeting
      layout: "SPOTLIGHT", // meeting layout - GRID | SPOTLIGHT | SIDEBAR
    },
  };

  const meeting = new VideoSDKMeeting();
  meeting.init(config);
}