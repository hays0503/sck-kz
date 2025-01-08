/* eslint-disable @typescript-eslint/no-explicit-any */

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export const isMobileDevice = (userAgent: string) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    isMobileDevice:  parser.getDevice().type === 'mobile',
    deviceType: (result.device && result.device.type) || 'desktop',
  };
};

interface SpecificLayout {  
  MobileLayout: any;
  DesktopLayout: any;
  props: any;
}

export const returnSpecificLayout = async({
  MobileLayout,
  DesktopLayout,
  props,
}: SpecificLayout) => {

  const UserHeaders = (await headers()).get('user-agent');
  
  const device = await isMobileDevice(UserHeaders || '');

  console.log('device',  device);
  if (process.env.MOBILE_SITE_ONLY ?? device.isMobileDevice) {
    return MobileLayout({ ...props});
  } else {
    return DesktopLayout({ ...props});
  }
};
