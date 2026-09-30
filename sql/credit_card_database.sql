-- ====================================================================
-- CREDIT CARD FINANCIAL & CUSTOMER ANALYTICS DATABASE PIPELINE
-- ====================================================================
-- Database Engine: PostgreSQL / MySQL / SQL Server
-- Description: Table schemas, bulk data ingestion, and weekly incremental updates.

-- 1. Create Database
CREATE DATABASE credit_card_db;

-- 2. Create Table: Credit Card Transaction Detail
CREATE TABLE credit_card_detail (
    Client_Num INT PRIMARY KEY,
    Card_Category VARCHAR(20),
    Annual_Fees INT,
    Activation_30_Days INT,
    Customer_Acq_Cost INT,
    Week_Start_Date DATE,
    Week_Num VARCHAR(20),
    Qtr VARCHAR(10),
    current_year INT,
    Credit_Limit DECIMAL(10,2),
    Total_Revolving_Bal INT,
    Total_Trans_Amt INT,
    Total_Trans_Vol INT,
    Avg_Utilization_Ratio DECIMAL(10,3),
    Use_Chip VARCHAR(10),
    Exp_Type VARCHAR(50),
    Interest_Earned DECIMAL(10,2),
    Delinquent_Acc INT
);

-- 3. Create Table: Customer Profile Detail
CREATE TABLE customer_detail (
    Client_Num INT PRIMARY KEY,
    Customer_Age INT,
    Gender VARCHAR(5),
    Dependent_Count INT,
    Education_Level VARCHAR(50),
    Marital_Status VARCHAR(20),
    state_cd VARCHAR(10),
    Zipcode INT,
    Car_Owner VARCHAR(5),
    House_Owner VARCHAR(5),
    Personal_loan VARCHAR(5),
    contact VARCHAR(50),
    Customer_Job VARCHAR(50),
    Income INT,
    Cust_Satisfaction_Score INT
);

-- 4. Initial Bulk Data Import (Baseline Feeds)
COPY credit_card_detail 
FROM 'datasets/credit_card.csv' 
DELIMITER ',' 
CSV HEADER;

COPY customer_detail 
FROM 'datasets/customer.csv' 
DELIMITER ',' 
CSV HEADER;

-- 5. Weekly Incremental Data Import (Weekly Feed Updates)
COPY credit_card_detail 
FROM 'datasets/cc_add.csv' 
DELIMITER ',' 
CSV HEADER;

COPY customer_detail 
FROM 'datasets/cust_add.csv' 
DELIMITER ',' 
CSV HEADER;
