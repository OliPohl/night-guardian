// #region Imports
// Importing modules
import path from 'path';
import fs from 'fs';

// Importing utils
import { getTempPath, getExePath } from './path-resolver.js';
import { parseRepeatAbbreviation } from './guardian-parser.js';
// #endregion Imports


// #region Template
// Create a template xml file for guardian/enforcer Change #DATE#, #NAME#, #KYS#, #TRIGGER#, #EXE# and #ARGS to use
const createTemplateXML = () => {
  return `<?xml version="1.0" encoding="UTF-16"?>
          <Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
            <RegistrationInfo>
              <Date>#DATE#</Date>
              <Author>NightGuardian</Author>
              <URI>\\#NAME#</URI>
            </RegistrationInfo>
            <Principals>
              <Principal id="Author">
                <LogonType>InteractiveToken</LogonType>
              </Principal>
            </Principals>
            <Settings>
              #KYS#
              <AllowHardTerminate>false</AllowHardTerminate>
              <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
              <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
              <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
              <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
              <IdleSettings>
                <StopOnIdleEnd>false</StopOnIdleEnd>
                <RestartOnIdle>false</RestartOnIdle>
              </IdleSettings>
            </Settings>
            <Triggers>
              #TRIGGER#
            </Triggers>
            <Actions Context="Author">
              <Exec>
                <Command>#EXE#</Command>
                <Arguments>#ARGS</Arguments>
              </Exec>
            </Actions>
          </Task>`;
}
// #endregion Template


// #region Trigger
// Create a trigger xml for guardian/enforcer
export function createTriggerXML(nextTime: string, repeats: string[] = [], kys: boolean = false, enabled: boolean = true): string {
  let trigger = '';
  if(kys) {
    trigger = `<TimeTrigger>
      <StartBoundary>${nextTime}</StartBoundary>
      <EndBoundary>${nextTime}</EndBoundary>
    </TimeTrigger>`;
  } else if (repeats.length === 0) {
    trigger = `<TimeTrigger>
          <StartBoundary>${nextTime}</StartBoundary>
          ${enabled ? '' : '<Enabled>false</Enabled>'}
        </TimeTrigger>`;
  } else {
      trigger = `<CalendarTrigger>
        <StartBoundary>${nextTime}</StartBoundary>
        ${enabled ? '' : '<Enabled>false</Enabled>'}
        <ScheduleByWeek>
          <WeeksInterval>1</WeeksInterval>
          <DaysOfWeek>
            ${repeats.map((repeat) => `<${parseRepeatAbbreviation(repeat)} />`).join('\n')}
          </DaysOfWeek>
        </ScheduleByWeek>
      </CalendarTrigger>`;
    }
  return trigger;
}
// #endregion Trigger


// #region XML
// Fill in specific value in the template
function fillInTemplateXML(template: string, key: string, value: string): string {
  return template.replace(key, value);
}

// Create a guardian/enforcer xml
export function createXML(date: string, name: string, kys: string, trigger: string, exe: string, args: string) {
  let xml = createTemplateXML();
  xml = fillInTemplateXML(xml, '#DATE#', date);
  xml = fillInTemplateXML(xml, '#NAME#', name);
  xml = fillInTemplateXML(xml, '#KYS#', kys);
  xml = fillInTemplateXML(xml, '#TRIGGER#', trigger);
  xml = fillInTemplateXML(xml, '#EXE#', exe);
  xml = fillInTemplateXML(xml, '#ARGS', args);
  return xml;
}

// Saves the xml to the temp folder
export function saveXML(xml: string, fileName: string) {
  const filePath = path.join(getTempPath(), fileName.includes('.xml') ? fileName : `${fileName}.xml`);
  fs.writeFileSync(filePath, xml);
  return filePath;
}
//#endregion XML