<script setup>
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

    defineProps({
        data: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <footer :style="{ 'backgroundColor': data.background_color, 'color': data.text_color }" class="w-full p-2 flex flex-col justify-center items-center gap-2">
        <p class="w-full text-center">{{ data.text }}</p>

        <img :src="data.images.logo" alt="Logo" class="w-28 h-auto object-cover">

        <Disclosure v-slot="{ open }">
            <DisclosureButton class="px-6 w-full flex justify-between items-center">
                <h1 class="text-xs font-semibold text-center w-full">Sweepstakes Disclaimer +</h1>
            </DisclosureButton>

            <DisclosurePanel class="px-7 flex flex-col mt-3">
                <p class="text-xs">
                    NO PURCHASE OR PAYMENT NECESSARY TO ENTER OR WIN. 

                    <div class="font-semibold mb-1 mt-4 underline">NOTICE ON DISPUTE RESOLUTION:</div>

                    These Terms of Use include a mandatory arbitration provision and a waiver of class action that dictates the resolution of claims between you and the Advertiser. By utilizing the services (as defined below), you consent to resolving disputes with the Advertiser through binding individual arbitration instead of pursuing court proceedings before a judge and jury. Furthermore, you expressly forfeit your right to engage in a class action lawsuit or participate in class-wide arbitration.


                    <div class="font-semibold mb-1 mt-4 underline">Eligibility:</div>

                    The Sweepstakes is open to legal residents of the Country, where this contest is being promoted in who are 18 years of age or older at the time of entry. Void where prohibited by law

                    <div class="font-semibold mb-1 mt-4 underline">Entry Period:</div>

                    The Sweepstakes begins and ends as specified on the landing page. This campaign will expire on December 31,2023. The service will be renewed every 30 days until canceled. A random drawing will be conducted on or after the close of Entry Period.  Winner will be drawn from among all valid entries received by Sponsoring Advertiser during the Entry Period. Potential Winner will be notified, on or after the close of Entry Period and must timely respond in accordance with the terms and deadlines stated.

                    <div class="font-semibold mb-1 mt-4 underline">How to Enter:</div>

                    Follow the instructions on the landing page to submit your entry, a payment is required to participate.  If you wish to participate without signing up for a 3-day trial to Sponsoring Advertiser’s website , please send an email to prizedraw@fineobtain.com

                    <div class="font-semibold mb-1 mt-4 underline">Prizes:</div>

                    All new customers participate in the prize draw for the shown campaign product. Prizes are as described on the landing page. No substitution, transfer, or cash equivalent for the prize is permitted. All taxes and any other expenses not explicitly mentioned as part of the prize are the sole responsibility of the winner.

                    Except as explicitly stated, all Prizes are awarded as is, without any representations or warranties, and cannot be transferred, sold, substituted, or redeemed for cash by Winner. Winner is solely responsible for all taxes, costs, and fees associated with Prize receipt, ownership, and/or use.

                    All third-party names and trademarks are the property of their respective owners.

                    In addition, if the Potential Winner is a Canadian resident, (s)he must correctly answer a mathematical skill-testing question to be eligible to be confirmed as the Winner.

                    Entry is subject to all applicable international, federal, state, and local laws and regulations and is void where prohibited. See the Official Rules for more details. In certain jurisdictions, local rules and laws may restrict or prohibit the award of certain prizes or impose additional restrictions on participation.

                    <div class="font-semibold mb-1 mt-4 underline">Winner Selection:</div>

                    Winners will be selected in a random drawing from all eligible entries received. If you are the lucky winner, you will be contacted directly by email.

                    Anticipated Prize Fulfillment Date: TBD by Sponsoring Advertiser  in its sole and absolute discretion, and subject to satisfactory completion of any documentation as may be required for fulfillment and delivery of the Grand Prize.

                    <div class="font-semibold mb-1 mt-4 underline">Odds:</div>

                    The odds of winning does not depend on the number of eligible entries received. The ways to Enter are described above.

                    <div class="font-semibold mb-1 mt-4 underline">General Conditions:</div>

                    Sponsoring Advertiser reserves the right to cancel, suspend, or modify the Sweepstakes if any fraud or technical failure compromises the integrity of the Sweepstakes, as determined by Sponsoring Advertiser in its sole discretion. By entering, participants agree to be bound by these Official Rules and the decisions of Sponsoring Advertiser, which are final and binding in all respects.

                    All new customers are entered into the prize draw for the displayed campaign product. If you are the lucky winner, you will be contacted directly by email. This special offer includes a three-day trial to an affiliate service, after which the subscription fee will be thirty-three euros every fourteen days - will be automatically deducted from your credit card. If for any reason you are not satisfied with the service, you can cancel your account within three days. The service will be renewed every thirty days until canceled. This campaign will expire on the thirty-first of December this year. If you would like to participate without signing up for a three-day trial at Sponsoring Advertiser’s website, please send an email.

                    This special offer comes with a 3-day trial to an affiliated subscription service, after which there is a subscription fee (payable every 30 days) that will be automatically deducted from your credit card. If, for any reason, you are not satisfied with the service, you may cancel your account with Seemebest within 3 days. The service will be renewed every 30 days until canceled.

                    <div class="font-semibold mb-1 mt-4 underline">Release and Limitations of Liability:</div>
                    
                    By participating in the Sweepstakes, entrants agree to release and hold harmless Sponsoring Advertiser and its respective affiliates, subsidiaries, advertising and promotion agencies, and their directors, officers, employees, and agents from any and all liability, loss, or damage arising from or in connection with the Sweepstakes.

                    While our website makes reasonable efforts to monitor and/or moderate content posted on its social media platforms, we do not moderate all comments and cannot always respond in a timely manner to online requests for information.

                    <div class="font-semibold mb-1 mt-4 underline">Sponsor:</div>

                    The Sweepstakes is sponsored by Sponsoring Advertiser: Seemebest.

                    For a list of winners or a copy of these Official Rules, send a self-addressed stamped envelope to Sponsoring Advertiser. This Sweepstakes is in no way sponsored, endorsed, or administered by, or associated with, any social media platform.

                    This site is not part of the website of Facebook or Facebook Inc. In addition, this site is not endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc. Facebook provides a platform to serve advertising, but the opinions and/or views expressed on this website are not representative of Facebook, Inc.

                    The opinions and/or views expressed on our website’s social media platforms, including but not limited to our blogs and Facebook pages, represent the thoughts of individual bloggers and online communities, and not necessarily those of our website or any of its business partners, affiliates or any of their officers,  employees, staff members or members of their respective board of directors. The opinions and opinions expressed on these pages do not in any way reflect the views of the site on which they are posted, other sites affiliated with the site, personnel involved in the maintenance of the site, or any member of the site.

                    Any opinions or views expressed on the social media platforms on this website are not representative of Facebook, Inc
                </p>
            </DisclosurePanel>
        </Disclosure>
    </footer>
</template>
