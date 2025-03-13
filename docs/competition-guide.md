# Using R-Inspect in Your Competition

This guide provides the information you need to implement R-Inspect at your robotics competition event.

## Overview

R-Inspect is designed to streamline the robot inspection process at FIRST Robotics competitions. By digitizing the inspection workflow, it helps event staff efficiently manage inspections, track team status, and improve the overall experience for teams and inspectors.

## Benefits of Using R-Inspect

- **Paperless Workflow**: Eliminate paper checklists and manual status tracking
- **Real-time Status Updates**: Monitor inspection progress across all teams in real-time
- **Centralized Management**: Coordinate inspectors and track team progress from a single dashboard
- **Improved Team Experience**: Teams can see their inspection status and requirements clearly
- **Historical Data**: Maintain records of inspections for future reference
- **Offline Capability**: Operate without continuous internet access during the event

## Requirements

### Hardware

- **Server**: Any machine capable of running Node.js and MongoDB
  - Recommended: 4GB RAM, 2 CPU cores, 20GB storage
- **Network**: Local Wi-Fi network or wired connection for the inspection stations
- **Client Devices**: Tablets, laptops, or smartphones for inspectors and admin access
  - Recommended: iPad or Android tablets with modern browsers

### Software

- **Backend**: This R-Inspect backend repository
- **Frontend**: Contact the maintainers for access to the frontend deployment
- **Database**: MongoDB (local or cloud-based)
- **Web Server**: Nginx or similar (for production deployment)

## Implementation Steps

### 1. Pre-Competition Setup (2-4 weeks before)

1. Set up server infrastructure:
   - Deploy the backend application
   - Configure MongoDB database
   - Set up network infrastructure
   - Deploy the frontend application (contact maintainers)

2. Configure event-specific data:
   - Import team list from FIRST API (see [Setup Guide](./setup.md))
   - Configure inspection checklists if customization is needed
   - Create administrator and inspector accounts

3. Test the system:
   - Run through complete inspection workflows
   - Test all devices that will be used at the event
   - Verify offline functionality

### 2. Event Setup (Day Before or Morning Of)

1. Set up physical infrastructure:
   - Configure inspection stations with tablets/devices
   - Ensure all devices can connect to the network
   - Verify server is accessible from all locations

2. Prepare inspector team:
   - Train inspectors on using the system
   - Distribute login credentials
   - Review the inspection process and workflow

3. Final checks:
   - Verify team data is up-to-date
   - Check that all inspection stations are functioning
   - Test backup procedures

### 3. During the Event

1. Monitor system performance:
   - Have a technical person available for troubleshooting

2. Use the dashboard to:
   - Track overall inspection progress
   - Identify bottlenecks in the inspection process
   - Coordinate inspector resources as needed

### 4. Post-Event

1. Delete all data from the system/database as per FIRST guidelines
2. Collect feedback from inspectors and teams
3. Report any issues or feature requests to the R-Inspect team

## Frequently Asked Questions

### How do we get access to the frontend application?

The frontend repository is currently closed-source, but the maintainers can help deploy it to your cloud instance or provide other arrangements. Contact the team via GitHub or email for assistance.

### Can we run R-Inspect entirely offline?

Not right now, R-Inspect is designed to work in environments with internet access. The system is designed to work with multiple inspectors acessing through their phones or tablets wich might be in a different network than the server.

### How many inspectors can use the system simultaneously?

The system is designed to handle many concurrent users. There is no limit to the number of inspectors that can use the system simultaneously.

### Can we customize the inspection checklists?

Yes, the inspection criteria can be customized for different event types. Right now this is a manual process that requires contacting the maintainers to colaborate.

## Contact Information

For questions about implementing R-Inspect at your competition:

- Review the [project repository](https://github.com/silasvergilio/r-inspect-backend)
- Contact the maintainers directly:
  - [Matheus Dubin](https://github.com/MatheusDubin)
  - [Amanda Wilmsen](https://github.com/amandacwilmsen)
  - [Silas Vergilio](https://github.com/silasvergilio)

We're dedicated to helping robotics competitions improve their inspection process and are happy to provide support for successful implementation. 