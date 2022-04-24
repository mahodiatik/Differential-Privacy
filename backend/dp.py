import pandas as pd
import numpy as np
import sklearn

def exec(sigma=0.5):
      train_data = pd.read_csv('dataset/ground_truth_s3.csv', error_bad_lines=False, nrows=100000)
      train_data.drop('taxi_id_i', axis=1, inplace=True)
      cols_test = ["payment_c", "fare_n", "tips_n", "seconds_n","miles_n","dca_c", "shift_c", "pca_c", "company_c"] 
      for col_test in cols_test:
        train_data[col_test].fillna(train_data[col_test].median(), inplace=True)
      mu = 0

        # noise_rate = 0.05 adds a 5 percent noise
      row_numbers = train_data.count()
      #column_numbers = len(without_noise_signal.columns) 
      noise = np.random.normal(mu, sigma, [10000, 8])
      target = train_data.company_c
      inputs = train_data.drop('company_c',axis='columns')
      without_noise_signal_arr = inputs.head(10000).to_numpy()
      with_noise_signal_arr = noise + without_noise_signal_arr

      with_noise_signal = pd.DataFrame(with_noise_signal_arr, columns=["shift_c", "pca_c", "dca_c", "payment_c", "fare_n", "tips_n", "seconds_n", "miles_n"])
      from sklearn.model_selection import train_test_split
      X_train, X_test, y_train, y_test = train_test_split(inputs,target,test_size=0.2)

      from sklearn.naive_bayes import GaussianNB
      model = GaussianNB()
      model.fit(X_train,y_train)

      percent = model.score(X_test,y_test)
      return percent 